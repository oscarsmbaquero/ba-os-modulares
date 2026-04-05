import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GoogleGenAI, Chat } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-bot',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="bg-surface-container-lowest flex flex-col h-full w-full">
      <!-- Header -->
      <div class="bg-primary text-white p-4 flex items-center gap-3 border-b border-outline-variant/20">
        <div class="w-10 h-10 bg-white/10 flex items-center justify-center">
          <mat-icon>smart_toy</mat-icon>
        </div>
        <div>
          <h3 class="font-display font-bold text-lg leading-tight text-white tracking-wide uppercase">Asistente 2IBM</h3>
          <p class="text-[0.65rem] text-on-tertiary-container uppercase tracking-widest font-bold">Respuestas instantáneas con IA</p>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-surface" #scrollContainer>
        @if (messages().length === 0) {
          <div class="h-full flex flex-col items-center justify-center text-center p-6 text-on-surface-variant">
            <div class="w-16 h-16 bg-surface-container-low flex items-center justify-center mb-4 text-primary border border-outline-variant/20 shadow-sm">
              <mat-icon class="text-4xl w-10 h-10">forum</mat-icon>
            </div>
            <p class="font-display font-bold text-primary mb-2 uppercase tracking-wide">¡Hola! Soy el asistente virtual de 2IBM.</p>
            <p class="text-sm leading-relaxed max-w-xs">Puedo ayudarle con información sobre nuestros baños modulares, procesos de fabricación, tiempos de entrega o cualquier otra duda.</p>
            
            <div class="mt-8 flex flex-col gap-2 w-full max-w-xs">
              <button (click)="sendSuggested('¿Cuáles son las ventajas de un baño modular?')" class="text-xs font-bold bg-surface border border-outline-variant/30 px-4 py-3 hover:bg-surface-container-low hover:border-primary/30 transition-colors text-primary uppercase tracking-widest text-left flex items-center justify-between group">
                <span>Ventajas de baños modulares</span>
                <mat-icon class="text-sm w-4 h-4 text-on-tertiary-container group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
              </button>
              <button (click)="sendSuggested('¿Cuánto tardan en fabricar?')" class="text-xs font-bold bg-surface border border-outline-variant/30 px-4 py-3 hover:bg-surface-container-low hover:border-primary/30 transition-colors text-primary uppercase tracking-widest text-left flex items-center justify-between group">
                <span>Tiempos de fabricación</span>
                <mat-icon class="text-sm w-4 h-4 text-on-tertiary-container group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        }

        @for (msg of messages(); track msg.timestamp) {
          <div class="flex" [ngClass]="{'justify-end': msg.role === 'user'}">
            <div class="max-w-[85%] px-5 py-4 shadow-sm"
                 [ngClass]="{
                   'bg-primary text-white rounded-l-none': msg.role === 'user',
                   'bg-surface-container-lowest border border-outline-variant/20 text-on-surface rounded-r-none': msg.role === 'bot'
                 }">
              <p class="text-sm whitespace-pre-wrap leading-relaxed">{{ msg.content }}</p>
              <span class="text-[10px] mt-2 block opacity-70 font-mono" [ngClass]="{'text-right': msg.role === 'user'}">
                {{ msg.timestamp | date:'HH:mm' }}
              </span>
            </div>
          </div>
        }

        @if (isLoading()) {
          <div class="flex justify-start">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-r-none px-5 py-4 shadow-sm flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-primary/50 rounded-none animate-bounce"></div>
              <div class="w-1.5 h-1.5 bg-primary/50 rounded-none animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-1.5 h-1.5 bg-primary/50 rounded-none animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        }
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-surface-container-lowest border-t border-outline-variant/20">
        <form (ngSubmit)="sendMessage()" class="flex gap-2">
          <input 
            type="text" 
            [(ngModel)]="userInput" 
            name="userInput"
            placeholder="Escriba su pregunta aquí..." 
            class="flex-1 bg-surface border border-outline-variant/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-on-tertiary-container focus:border-transparent text-on-surface placeholder-on-surface-variant/50 transition-shadow"
            [disabled]="isLoading()"
            autocomplete="off"
          >
          <button 
            type="submit" 
            [disabled]="!userInput.trim() || isLoading()"
            class="bg-primary text-white w-12 h-12 flex items-center justify-center hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0">
            <mat-icon class="text-on-tertiary-container">send</mat-icon>
          </button>
        </form>
      </div>
    </div>
  `
})
export class AiBotComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  messages = signal<ChatMessage[]>([]);
  userInput = '';
  isLoading = signal(false);
  
  // Initialize Gemini API
  // Using the environment variable injected by the build system
  private ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || '' });
  
  private systemInstruction = `
    Eres el asistente virtual oficial de 2IBM (Industrial Ibérica de Baños Modulares).
    Tu objetivo es ayudar a los visitantes de la web corporativa a entender qué hace la empresa, cómo trabaja y por qué deberían elegirla.
    
    Información clave sobre 2IBM:
    - Somos una empresa especializada en la fabricación de baños modulares industrializados (off-site construction).
    - Fabricamos los baños completos en nuestra fábrica (estructura, instalaciones, acabados, sanitarios) y los enviamos a la obra listos para conectar (Plug & Play).
    - Ventajas: Reducción de tiempos de obra (hasta un 30%), control de calidad estricto en fábrica, reducción de residuos, precio cerrado sin desviaciones, sostenibilidad.
    - Nuestro proceso (Cómo trabajamos): 1. Diseño e ingeniería conjunta con el cliente. 2. Fabricación en cadena de montaje. 3. Control de calidad. 4. Transporte especializado. 5. Izado e instalación en obra.
    - Tiempos (Cuándo): La fabricación de un baño puede tomar apenas unos días en cadena, pero el proceso completo desde el diseño hasta la entrega depende del volumen. Se fabrican en paralelo a la estructura del edificio.
    - Fábrica (Dónde): Contamos con instalaciones modernas preparadas para producción en serie con estrictos controles de calidad.
    
    Tono: Profesional, innovador, industrial, confiable y servicial.
    Responde de manera concisa y clara. Usa viñetas si es necesario.
    
    RESTRICCIÓN CRÍTICA: Solo debes responder consultas relacionadas directamente con 2IBM, sus productos (baños modulares), sus procesos industriales y servicios. 
    Si el usuario pregunta sobre cualquier otro tema ajeno a la empresa (política, deportes, cultura general, consejos personales, etc.), debes declinar amablemente la respuesta indicando que tu función es exclusivamente asistir en consultas sobre 2IBM.
    
    Si te preguntan por precios específicos, indica que cada proyecto es a medida y que deben contactar con el equipo comercial a través del formulario o info@2ibm.es.
  `;

  private chatSession: Chat | null = null;

  async initChat() {
    if (!this.chatSession) {
      try {
        this.chatSession = this.ai.chats.create({
          model: 'gemini-2.0-flash',
          config: {
            systemInstruction: this.systemInstruction,
            temperature: 0.3
          }
        });
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    }
  }

  sendSuggested(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  async sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading()) return;

    // Add user message
    this.messages.update(msgs => [...msgs, {
      role: 'user',
      content: text,
      timestamp: new Date()
    }]);
    
    this.userInput = '';
    this.isLoading.set(true);
    this.scrollToBottom();

    await this.initChat();

    try {
      if (this.chatSession) {
        const response = await this.chatSession.sendMessage({ message: text });
        
        this.messages.update(msgs => [...msgs, {
          role: 'bot',
          content: response.text || 'Lo siento, no he podido procesar su solicitud.',
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Chat session not initialized');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.messages.update(msgs => [...msgs, {
        role: 'bot',
        content: 'Ha ocurrido un error de conexión. Por favor, inténtelo de nuevo más tarde o contacte directamente con info@2ibm.es.',
        timestamp: new Date()
      }]);
    } finally {
      this.isLoading.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer) {
        const element = this.scrollContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }
}
