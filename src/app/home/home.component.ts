import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  animation1() {

    const imgAnimation = document.getElementById('imgAnimation') as HTMLElement
    const imgTheOne = document.getElementById('imgTheOne') as HTMLElement

    imgAnimation.style.transition = '1s'
    imgTheOne.style.transition = '1s'

    setTimeout(() => {

      imgAnimation.style.right = "2em"
      imgTheOne.style.background = 'linear-gradient(to right, #d847d8,white)'

    }, 100);

    setTimeout(() => {

      imgAnimation.style.right = "0em"
      

    }, 500);

  }

  animation2() {

    const imgAnimation = document.getElementById('imgAnimation') as HTMLElement
    const imgTheOne = document.getElementById('imgTheOne') as HTMLElement

    imgAnimation.style.transition = '1s'

    setTimeout(() => {

      imgAnimation.style.right = "-2em"
      imgTheOne.style.background = 'linear-gradient(to right, #d847d8,white)'

    }, 100);

    setTimeout(() => {

      imgAnimation.style.right = "0em"
      imgTheOne.style.background = 'linear-gradient(to right, white,white)'

    }, 500);



  }


  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  public recording = false;
  public audioUrl: string | null = null;

  startRecording() {
    this.recording = true;
    this.audioChunks = []; // Reset the audio chunks

    const mediaConstraints = { audio: true };

    // Get the user's microphone stream
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  // Success callback for starting the recording
  successCallback(stream: MediaStream) {
    // Initialize the MediaRecorder with the stream
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    // Store audio chunks as they become available
    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.audioChunks.push(event.data);
    };

    // When the recording stops, create the audio URL and display it
    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.audioUrl = URL.createObjectURL(audioBlob);  // Create a URL for the audio
      console.log('Recording finished. Audio URL:', this.audioUrl);
    };

    // Start recording
    this.mediaRecorder.start();
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.recording = false;
      console.log('Stopping the recording...');
      
      // Stop the recorder and trigger the onstop event
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop media tracks
      console.log('Recording stopped');
    } else {
      console.log('MediaRecorder is not active');
    }
  }

  // Handle any errors during recording
  errorCallback(error: any) {
    console.error('Error accessing the microphone:', error);
  }


}


