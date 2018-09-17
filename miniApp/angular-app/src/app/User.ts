// User class, contains same fields as the backend db schema for the users. 

export class User {
    username: String;
    google_id: String;
    rooms: [String];
  }