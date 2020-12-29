import React, { Component } from "react";

class MainFeedReplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      items: [],
      inputdefault: "",
      commentCnt: this.props.replies
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: { reply: value } });
  }
  submitItem(e) {
    e.preventDefault();
    let items = this.state.items;
    let item = this.state.item;
    items.push(item);
    this.setState({ items: items });
    this.setState({ item: { reply: "" } });
    this.setState({ commentCnt: this.state.commentCnt + 1 });
  }
  onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      let items = this.state.items;
      let item = this.state.item;
      items.push(item);
      this.setState({ items: items });
      this.setState({ item: { reply: "" } });
      this.setState({ commentCnt: this.state.commentCnt + 1 });
    }
  }

  render() {
    return (
      <>
        <p>댓글 갯수 : {this.state.commentCnt}개</p>
        <input
          value={this.state.item.reply}
          type="text"
          name="item"
          onChange={this.handleInputChange}
          onKeyDown={this.onEnterPress}
        />
        <input type="submit" value="Submit" onClick={this.submitItem} />
        {this.state.items.map((item, index) => {
          return <p key={index}>{item.reply}</p>;
        })}
      </>
    );
  }
}
export default MainFeedReplies;
