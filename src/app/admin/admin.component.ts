import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [CommonModule]
})
export class AdminComponent {
  images: string[] = [];
  imagePreview: string | null = null;

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage() {
    if (this.imagePreview) {
      this.images.push(this.imagePreview);
      this.imagePreview = null;
      alert('Image téléchargée avec succès !');
    }
  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
  }
}