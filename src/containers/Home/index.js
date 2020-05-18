import React, { PureComponent } from "react";
import Category from "./components/Category";
import Headline from "./components/Headline";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList"
class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Category />
        <Headline />
        <Discount />
        <LikeList />
      </div>
    );
  }
}

export default Index;
