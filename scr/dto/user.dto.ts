export class UserDto {
    name: string;
    email: string;
    createdAt: Date;
  
    constructor(name: string, email: string, createdAt: Date) {
      this.name = name;
      this.email = email;
      this.createdAt = createdAt;
    }

    toJson() {
        return {
          name: this.name,
          email: this.email,
          createdAt: this.createdAt,
        };
      }

  }
  