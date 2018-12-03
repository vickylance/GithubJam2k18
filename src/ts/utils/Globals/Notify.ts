export default class Notify {
  private type: NotifyTypes;
  private message: string;
  private data: any;

  constructor(type: NotifyTypes, message: string, data?: any) {
    this.type = type;
    this.message = message;
    this.data = data;
  }
}

export enum NotifyTypes {
  Warning,
  Error,
  Info
}
