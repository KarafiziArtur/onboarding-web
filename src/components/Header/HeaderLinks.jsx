/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import {Link} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import {AccountCircle, Menu} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import JSignOut from "../../auth/JSignOut";

function HeaderLinks({...props}) {
    const {classes} = props;
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText=""
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Menu}
                    dropdownList={[
                        <Link to="/" className={classes.dropdownLink}>
                            Playgrounds in the Netherlands
                        </Link>,

                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText=""
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={AccountCircle}
                    dropdownList={[
                        props.mode !== "guest" ? <JSignOut {...props}/> :  <Link to="/login" className={classes.dropdownLink}>
                        Guest
                    </Link>
                    ]}
                />

            </ListItem>
        </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
