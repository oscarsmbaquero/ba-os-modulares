import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
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
  
  sendSuggested(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  async sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading()) return;

    const history = this.toGeminiHistory(this.messages());

    // Add user message
    this.messages.update(msgs => [...msgs, {
      role: 'user',
      content: text,
      timestamp: new Date()
    }]);

    this.userInput = '';
    this.isLoading.set(true);
    this.scrollToBottom();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      this.messages.update(msgs => [...msgs, {
        role: 'bot',
        content: data.text || 'Lo siento, no he podido procesar su solicitud.',
        timestamp: new Date()
      }]);
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

  private toGeminiHistory(msgs: ChatMessage[]): GeminiContent[] {
    return msgs.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
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
