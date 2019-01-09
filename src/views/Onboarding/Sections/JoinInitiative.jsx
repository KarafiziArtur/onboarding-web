import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
// @material-ui/icons
// core components
import Button from "@material-ui/core/Button/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import {withNamespaces} from "react-i18next";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";


const JOIN_INITIATIVE = gql`
  mutation JoinInitiative($input: JoinInitiativeInput!) {
    joinInitiative(input: $input) {
      id
    }
  }
`;

class JoinInitiative extends React.Component {

    loadWorkspace = (eEvent) => {
        window.location.href = `/workspace/${this.props.playground.id}`;
    }

    render() {
        const {classes, playground} = this.props;
        if (playground.default) return null;

        let initiativeInput = {
            initiativeId: playground.id
        };

        return (
            <Mutation
                mutation={JOIN_INITIATIVE}
                update={this.loadWorkspace}
            >
                {(joinInitiative, { loading, error }) => (
                    <div>
                        <Button
                            className={"btn btn-highlight pr-25 pull-left"}
                            onClick={(/*event*/) => {
                                console.log("Is user is logged in");
                                joinInitiative({variables: {input: initiativeInput}});
                            }
                            }
                        >
                            <PersonAdd className={"mr-5"}/>
                            <span>Maak deze speeltuin rookvrij</span>
                        </Button>
                        {loading && <p>Loading...</p>}
                        {error && <Dialog open={true} className={classes.container}>{error.toString()}</Dialog>}
                    </div>
                )}
            </Mutation>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(JoinInitiative)
);
