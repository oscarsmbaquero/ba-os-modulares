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
  templateUrl: './ai-bot.component.html',
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
