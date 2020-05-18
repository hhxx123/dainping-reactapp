import React, { Component } from "react";
import LikeItem from "../LikeItem";
import "./style.css";
import Loading from "../../../../components/Loading";


class LikeList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.removeListener = false;
  }
  render() {
    const { data, pageCount } = this.props;
    return (
      <div className="likeList" ref={this.myRef}>
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {data.map((item, index) => {
            return <LikeItem key={item.id} data={item} />;
          })}
          {pageCount < 3 ? (
            <Loading />
          ) : (
            <a className="likeList__viewAll">查看更多</a>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.pageCount < 3) {
      window.addEventListener("scroll", this.handleScroll);
    } else {
      this.removeListener = true;
    }
    if (this.props.pageCount === 0) {
      this.props.fetchData();
    }
    //this.props.fetchData();
  }

  componentWillUnmount() {
    if (!this.removeListener) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
  componentDidUpdate() {
    if (this.props.pageCount >= 3 && !this.removeListener) {
      window.removeEventListener("scroll", this.handleScroll);
      this.removeListener = true;
    }
  }
  //处理屏幕滚动
  handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      this.props.fetchData();
    }
  };
}

export default LikeList;
