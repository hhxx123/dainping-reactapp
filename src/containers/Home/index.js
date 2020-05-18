import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Category from "./components/Category";
import Headline from "./components/Headline";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList";
import HomeHeader from "./components/HomeHeader";
import Activity from "./components/Activity";
import Footer from "../../components/Footer";
import Banner from "./components/Banner";
import {
  actions as homeActions,
  getLikes,
  getDiscounts,
  getPageCountOfLikes,
} from "../../redux/modules/home";
class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { likes, discounts, pageCount } = this.props;
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={discounts} />
        <LikeList
          data={likes}
          pageCount={pageCount}
          fetchData={this.fetchMoreLikes}
        />
        <Footer />
      </div>
    );
  }
   
  componentDidMount(){
      this.props.homeActions.loadDiscounts();
  }


  fetchMoreLikes =()=>{
      this.props.homeActions.loadLikes()
  }
}
const mapStateToProps = (state, props) => {
  return {
    likes: getLikes(state),
    discounts: getDiscounts(state),
    pageCount: getPageCountOfLikes(state),
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchProps)(Index);
