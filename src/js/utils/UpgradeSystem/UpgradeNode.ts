import Notify, { NotifyTypes } from "../Globals/Notify";

export default class UpgradeNode {
  public parent: UpgradeNode;
  public position: IPoint;
  public state: UpgradeState;
  public selected: boolean;
  public upgrade: function;
  public name: string;
  public description: string;

  constructor(
    parent: UpgradeNode,
    position: IPoint,
    state: UpgradeState,
    // upgrade: function,
    name: string,
    description: string,
    selected: boolean = false
  ) {
    this.parent = parent;
    this.position = position;
    this.state = state;
    // this.upgrade = upgrade;
    this.selected = selected;
  }

  /**
   * upgrade
   */
  public upgrade() {
    switch (this.state) {
      case UpgradedState.Upgraded:
        throw new Notify(NotifyTypes.Error, 'Trying to upgrade a Node which is already Upgraded.', {

        });
        break;
      case UpgradeState.Locked:
        throw new Notify(NotifyTypes.Error, 'Trying to upgrade a Node which is currently locked.');
        break;
      case UpgradeState.Unlocked:
        
        throw new Notify(NotifyTypes.Info);
        break;
      default:
        break;
    }
  }
}

enum UpgradeState {
  Locked,
  Upgraded,
  Unlocked
}

interface IPoint {
  x: number;
  y: number;
}
