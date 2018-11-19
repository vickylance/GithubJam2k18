
class Square {
  public topLeft: ControlNode, public topRight: ControlNode, public bottomRight: ControlNode, public bottomLeft: ControlNode;
  public centreTop: Node, public centreRight: Node, public centreBottom: Node, public centreLeft: Node;

  public Square (ControlNode _topLeft, ControlNode _topRight, ControlNode _bottomRight, ControlNode _bottomLeft) {
    topLeft = _topLeft;
    topRight = _topRight;
    bottomRight = _bottomRight;
    bottomLeft = _bottomLeft;

    centreTop = topLeft.right;
    centreRight = bottomRight.above;
    centreBottom = bottomLeft.right;
    centreLeft = bottomLeft.above;
  }
}