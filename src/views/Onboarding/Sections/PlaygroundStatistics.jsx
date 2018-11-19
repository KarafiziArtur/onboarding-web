import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import People from "@material-ui/icons/People";
import SmokingRooms from "@material-ui/icons/SmokingRooms";
import SmokeFree from "@material-ui/icons/SmokeFree";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import { withNamespaces } from "react-i18next";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import StartOrJoinInitiative from "./JoinInitiative";

const GET_SMOKEFREE_PROGRESS = gql`
  {
    progress {
      smokeFree {
        count
        percentage
      }
      workingOnIt {
        count
        percentage
      }
      smoking {
        count
        percentage
      }
    }
  }
`;

const withPlaygroundProgress = graphql(GET_SMOKEFREE_PROGRESS, {
    props: ({ ownProps, data }) => {
        if(data.loading) return { statsLoading: true };
        if(data.error) return { hasErrors: true };

        console.log(data.progress);
        return {
            progress: data.progress
        };
    }
});

class PlaygroundStatistics extends React.Component {
    render() {
        const { statsLoading, progress, playground, t, classes } = this.props;
        if(statsLoading || !progress) {
            return "Loading...";
        }
        return (
            <div className={classes.section + " playground-statistics wrapper"}>
                <div className={classes.container + " playground-statistics container"}>
                    <h2 className="playground ">
                        {t("onboarding.playground.details.title.default")}
                    </h2>

                    <StartOrJoinInitiative playground={playground}/>

                    <div id="navigation-pills">
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} lg={6}>
                                <NavPills
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: t(
                                                "onboarding.playground.progress.smokefree.title",
                                                { percentage: progress.smokeFree.percentage }
                                            ),
                                            tabIcon: SmokeFree
                                        },
                                        {
                                            tabButton: t(
                                                "onboarding.playground.progress.workingonit.title",
                                                { percentage: progress.workingOnIt.percentage }
                                            ),
                                            tabIcon: People
                                        },
                                        {
                                            tabButton: t(
                                                "onboarding.playground.progress.smoking.title",
                                                { percentage: progress.smoking.percentage }
                                            ),
                                            tabIcon: SmokingRooms
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
};

const SmokeFreePlaygroundProgress = withPlaygroundProgress(PlaygroundStatistics);

export default withStyles(pillsStyle)(
    withNamespaces("translations")(SmokeFreePlaygroundProgress)
);