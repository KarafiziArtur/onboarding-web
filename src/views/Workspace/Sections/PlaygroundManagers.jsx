import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import {withNamespaces} from "react-i18next";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


class PlaygroundManagers extends React.Component {
    render() {
        const {playground, profile} = this.props;
        if (!playground || !profile) return "Loading...";
        console.info(`Displaying ${playground.managers ? playground.managers.length : 0} managers for playground`, playground);
        return (
            <div>
                <p>
                    Er zijn in totaal {playground.volunteerCount} vrijwilligers die helpen met rookvrij maken van deze speeltuin.
                </p>
                <div class="manager-container" className={playground.managers.length > 0 ? '' : 'hide'}>
                    <h3 style={{fontSize: "18px"}}>
                        Beheerders van de speeltuin :
                    </h3>
                    <List>
                        {playground.managers.map(function (manager, index) {
                            return <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>{manager.username.charAt(0)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={manager.username} secondary={manager.id === profile.id ? '(You)' : ''}/>
                            </ListItem>
                        })}
                    </List>
                </div>
            </div>
        );
    }
}

export default withStyles(pillsStyle)(
    withNamespaces("translations")(PlaygroundManagers)
);