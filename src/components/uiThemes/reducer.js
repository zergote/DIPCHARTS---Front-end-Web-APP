// Aca se almacenan los colores de los temas
import {
    SET_THEME_DARK,
    SET_THEME_WHITE,
    SET_THEME_BLUEDARK,
    SET_THEME_FROM_LOCALSTORAGE
} from "./constants";

const initialState = {
    appliedTheme: {
        fontColor: "#bfbfbf",
        fontColorLow: "#8e8e8e",
        breadcrumbFontColorHover: "#bfbfbf",
        breadcrumbBg: "#333333",
        cardAlert: "#323534",
        cardAlertFontColor: "#bfbfbf",
        primaryLevelBgColor: "#1A1A1B",
        secondaryLevelBgColor: "#262626",
        tertiaryLevelBgColor: "#333333",
        quaternaryBgColor: "#262626",
        border: "#262626",
        fontColorTop: "#262626",
        headerTop: "peru",
        dbMTD: "#FFDC00",
        dbTopEL: "#DDDDDD",
        dbTopPL: "#39CCCC",
        headerChart: "#354EA5",
        headerColor: "#F8F7F6",
        regionFontColor: "#262626",
        regionFontColorHover: "#CCCCCC",
        selectedLinkColor: "#1A1A1B",
        selectedLinkColorHover: "#202020",
        userAdminBackgroundColor: "#A65252",
        userModBackgroundColor: "#4f5b93",
        userBackgroundColor: "#464646"
    },
    themeDark: {
        fontColor: "#bfbfbf",
        fontColorLow: "#8e8e8e",
        breadcrumbFontColorHover: "#bfbfbf",
        breadcrumbBg: "#333333",
        cardAlert: "#323534",
        cardAlertFontColor: "#bfbfbf",
        primaryLevelBgColor: "#1A1A1B",
        secondaryLevelBgColor: "#262626",
        tertiaryLevelBgColor: "#333333",
        quaternaryBgColor: "#262626",
        border: "#262626",
        fontColorTop: "#262626",
        headerTop: "peru",
        dbMTD: "#FFDC00",
        dbTopEL: "#DDDDDD",
        dbTopPL: "#39CCCC",
        headerChart: "#354EA5",
        headerColor: "#F8F7F6",
        regionFontColor: "#262626",
        regionFontColorHover: "#CCCCCC",
        selectedLinkColor: "#1A1A1B",
        selectedLinkColorHover: "#202020",
        userAdminBackgroundColor: "#A65252",
        userModBackgroundColor: "#4f5b93",
        userBackgroundColor: "#464646"
    },
    themeWhite: {
        fontColor: "#383838",
        fontColorLow: "#555555",
        breadcrumbFontColorHover: "#FFFFFF",
        breadcrumbBg: "#d3d3d3",
        cardAlert: "#FFFFFF",
        cardAlertFontColor: "#383838",
        primaryLevelBgColor: "#FFFFFF",
        secondaryLevelBgColor: "#F8F7F6",
        tertiaryLevelBgColor: "#d3d3d3",
        sidebarColorHover: "#383838",
        quaternaryBgColor: "#FFFFFF",
        border: "#EA4746",
        fontColorTop: "#262626",
        headerTop: "#EA4746",
        dbMTD: "#FFFFFF",
        dbTopEL: "#FFFFFF",
        dbTopPL: "#FFFFFF",
        headerChart: "#EA4746",
        headerColor: "#F8F7F6",
        regionFontColor: "#262626",
        regionFontColorHover: "#FFFFFF",
        selectedLinkColor: "#E8E7E4",
        selectedLinkColorHover: "#E8E7E4",
        userAdminBackgroundColor: "#fc8080",
        userModBackgroundColor: "#899fff",
        userBackgroundColor: "#dbdbdb"
    },
    themeDarkBlue: {
        fontColor: "#EFEEEC",
        fontColorLow: "#d3d2d1",
        breadcrumbFontColorHover: "#EFEEEC",
        breadcrumbBg: "#333333",
        cardAlert: "#333333",
        cardAlertFontColor: "#bfbfbf",
        primaryLevelBgColor: "#141519",
        secondaryLevelBgColor: "#262626",
        tertiaryLevelBgColor: "#0877CA",
        quaternaryBgColor: "#262626",
        border: "#4E4E4C",
        fontColorTop: "#FFFFFF",
        headerTop: "#FFFFFF",
        dbMTD: "#4E4E4C",
        dbTopEL: "#4E4E4C",
        dbTopPL: "#4E4E4C",
        headerChart: "#4E4E4C",
        headerColor: "#F8F7F6",
        regionFontColor: "#262626",
        regionFontColorHover: "#FFFFFF",
        selectedLinkColor: "#141519",
        selectedLinkColorHover: "#1d1c30",
        userAdminBackgroundColor: "#A65252",
        userModBackgroundColor: "#4f5b93",
        userBackgroundColor: "#464646"
    }
};

const reducer = function setStateSidebar(state = initialState, action) {
    switch (action.type) {
        case SET_THEME_DARK:
            localStorage.setItem("uiTheme", JSON.stringify(state.themeDark));
            return Object.assign({}, state, {
                appliedTheme: state.themeDark
            });
        case SET_THEME_WHITE:
            localStorage.setItem("uiTheme", JSON.stringify(state.themeWhite));
            return Object.assign({}, state, {
                appliedTheme: state.themeWhite
            });
        case SET_THEME_BLUEDARK:
            localStorage.setItem(
                "uiTheme",
                JSON.stringify(state.themeDarkBlue)
            );
            return Object.assign({}, state, {
                appliedTheme: state.themeDarkBlue
            });

        case SET_THEME_FROM_LOCALSTORAGE:
            return Object.assign({}, state, {
                appliedTheme: action.value
            });

        default:
            return state;
    }
};

export default reducer;
