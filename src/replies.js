import React, { Component } from "react";

class Replies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      items: Object.values(this.props.replies),
      inputdefault: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }
  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let userid = "admin";

    this.setState({ [name]: { id: userid, reply: value } });
  }
  submitItem(e) {
    e.preventDefault();
    let items = this.state.items;
    let item = this.state.item;
    items.push(item);
    this.setState({ items: items });
    this.setState({ item: { id: "", reply: "" } });
  }
  onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      //---------------------------
      // 이부분에서 위에있는 submitItem을 호출하고싶다.
      let items = this.state.items;
      let item = this.state.item;
      items.push(item);
      this.setState({ items: items });
      this.setState({ item: { id: "", reply: "" } });
      //----------------------------
    }
  }

  render() {
    return (
      <>
        <p>댓글 갯수 : {this.state.items.length}개</p>
        <input
          value={this.state.item.reply}
          type="text"
          name="item"
          onChange={this.handleInputChange}
          onKeyDown={this.onEnterPress}
        />
        <input type="submit" value="Submit" onClick={this.submitItem} />
        {this.state.items.map((item, index) => {
          return (
            <p key={index}>
              <span>{item.id} : </span>
              {item.reply}
            </p>
          );
        })}
      </>
    );
  }
}
export default Replies;
