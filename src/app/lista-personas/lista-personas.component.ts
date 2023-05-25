import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  apellido: string;
  edad: number;
  cedula: string;
}

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css']
})
export class ListaPersonasComponent {
  personas: Persona[] = [];

  constructor() {
    // recuperar los datos almacenados en el almacenamiento local (si existen)
    const storedData = localStorage.getItem('personas');
    if (storedData) {
      this.personas = JSON.parse(storedData);
    }
  }

  agregarPersona(nuevoNombre: string, nuevoApellido: string, nuevaEdad: number, nuevaCedula: string) {
    const nuevaPersona: Persona = {
      nombre: nuevoNombre,
      apellido: nuevoApellido,
      edad: nuevaEdad,
      cedula: nuevaCedula
    };

    this.personas.push(nuevaPersona);

    // guardar los datos en el almacenamiento local
    localStorage.setItem('personas', JSON.stringify(this.personas));

    // imprimir la persona añadida
    console.log('Persona añadida:', nuevaPersona);
  }

  eliminarPersona(persona: Persona) {
    const index = this.personas.indexOf(persona);
    if (index !== -1) {
      this.personas.splice(index, 1);
    }

    // Aatualizar los datos en el almacenamiento local
    localStorage.setItem('personas', JSON.stringify(this.personas));
  }

  contarMayoresEdad(): number {
    return this.personas.filter(persona => persona.edad >= 18).length;
  }

  contarMenoresEdad(): number {
    return this.personas.filter(persona => persona.edad < 18).length;
  }
}
