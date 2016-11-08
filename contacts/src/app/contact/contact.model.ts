export class Contact {
  constructor(
    public id: number,
    public gender: number,
    public name: string,
    public family: string,
    public email: string,
    public address?: string) {}
}

