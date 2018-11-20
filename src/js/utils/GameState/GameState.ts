import Notify, { NotifyTypes } from "../Globals/Notify";
import GeneralStats from "./GeneralStats";

export default class GameState {
  public generalStats: GeneralStats;
  private cash: number; 

  public get cash() : number {
    return this.cash;
  }

  constructor() {
    this.cash = 0;
  }

  /**
   * addCash
   */
  public addCash(amount: number): Notify {
    if(amount > 0){
      this.cash += amount;
      return new Notify(NotifyTypes.Info, "Cash added succesfully", {
        cash: this.cash
      });
    } else {
      return new Notify(NotifyTypes.Error, "Invalid Amount passed.");
    }
  }

  /**
   * substractCash
   */
  public substractCash(amount: number): Notify {
    if(amount > 0) {
      if(amount > this.cash) {
        this.cash -= amount;
        return new Notify(NotifyTypes.Info, `Purchased successfully`, {
          cash: this.cash
        });
      } else {
        return new Notify(NotifyTypes.Error, `Amount not available`);
      }
    } else {
      return new Notify(NotifyTypes.Error, `Invalid amount passed: ${amount}`);
    }
  }
}
