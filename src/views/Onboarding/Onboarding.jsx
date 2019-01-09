import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { withNamespaces } from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import PlaygroundSearch from "./Sections/PlaygroundSearch";
import PlaygroundMap from "./Sections/PlaygroundMap";
import PlaygroundStatistics from "./Sections/PlaygroundStatistics";
import CallToAction from "./Sections/CallToAction";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const GET_PLAYGROUNDS = gql`
  {
    playgrounds {
      id
      name
      lat
      lng
      status
      volunteerCount
      votes
    }
  }
`;

const withPlaygrounds = graphql(GET_PLAYGROUNDS, {
    props: ({ ownProps, data }) => {
        console.log("GET_PLAYGROUNDS " , ownProps , " Data: ", data);
        if (data.loading) return { playgroundsLoading: true };
        if (data.error) return {
            hasErrors: true,
            error: data.error.toString()
        };
        return {
            playgrounds: data.playgrounds.map(playground => {
                return {
                    id: playground.id,
                    name: playground.name,
                    lat: playground.lat,
                    lng: playground.lng,
                    vol: playground.volunteerCount,
                    votes: playground.votes,
                    slug: playground.name + " Rookvrij"
                };
            })
        };
    }
});

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        console.log("Onboarding props:" + {...props});
        this.handlePlaygroundChange = this.handlePlaygroundChange.bind(this);
        const { t } = this.props;
        this.state = {
            playground: {
                default: true,
                name: t("playground.default.area")
            },
            map: {
                latlng: { lat: 52.092876, lng: 5.10448 },
                zoom: 8
            },
            view: 'default'

        };
    }

    componentWillMount() {
        console.log("Onboarding component will mount");
    }

    componentDidMount() {
        console.log("Onboarding component did mount");
    }

    componentWillUpdate() {
        console.log("Onboarding component will Update");
    }
    componentDidUpdate() {
        console.log("Onboarding component Did update");
    }


    handlePlaygroundChange(playground) {
        console.log("handlePlaygroundChange");
        this.setState({
            view: 'default',
            playground: playground,
            map: {
                latlng: { lat: playground.lat, lng: playground.lng },
                zoom: playground.zoom
            }
        });
    }

    render() {
        const { playgrounds, classes, ...rest } = this.props;
        const { playground, map } = this.state;
        console.log("Onboarding autheticattedUser ", this.props.authenticatedUser);
        console.log("Onboarding authData ", this.props.authData);
        return (
            <div className={"onboarding-wrapper"}>

                <Header
                    brand={"Rookvrije generatie"}
                    rightLinks={<HeaderLinks  {...this.props}/>}
                    fixed
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...this.state}
                    {...rest}
                    goBack={this.props.goBack}
                    goForward={this.props.goForward}
                    status={this.props.status}
                    mode={this.props.mode}
                />

              

                <Parallax image={require("assets/img/backgrounds/bg-zand.jpg")} className={"parralax onboarding"} >
                    <div className={classes.container + " onboarding-header"}>
                        <CallToAction playground={playground} />
                    </div>
                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised) + " onboarding-container"}>
                    <GridContainer className={"grid-container"} mode={this.props.mode}>
                        <GridItem xs={12} sm={12} md={6} className={"playground-map-container"}>
                            <PlaygroundSearch onPlaygroundChange={this.handlePlaygroundChange} playgrounds={playgrounds} />
                            <PlaygroundMap
                                isMarkerShown
                                viewOnly={true}
                                onPlaygroundChange={this.handlePlaygroundChange}
                                center={map.latlng}
                                zoom={map.zoom}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} className={"playground-stat-container"}>
                            <div>
                                <PlaygroundStatistics
                                    playgrounds={playgrounds}
                                    playground={playground}
                                    onBackButton={this.handlePlaygroundChange}
                                    defaultView={playground.default}
                                    {...this.props}
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer />
            </div>
        );
    }
}

const OnboardingWithPlaygrounds = withPlaygrounds(Onboarding);
export default withStyles(componentsStyle)(
    withNamespaces("translations")(OnboardingWithPlaygrounds)
);