import React, {useState, useEffect, useContext, useMemo} from "react";
import styled, {keyframes} from "styled-components";
import {NAVIGATION} from "../../constants/navigation";
import store from "../../../../api/store";
import {Link} from "react-router-dom";
import {COLORS} from "../../../colors/colors";
import Icon from "../../../components/Icon";
import NavigationElement from "../../../components/NavigationElement";
import HideButton from "./components/HideButton";
import {LanguageContext} from "@/common/context/languageContext";

const fadeIn = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding-top: 80px;
  position: relative;
  background-color: ${COLORS.white};
  box-shadow: 10px 20px 20px 1px ${COLORS.white};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${COLORS.white};
`;

const NavigationIcon = styled(Icon)``;

/* props.showFull  ? fadeIn: fadeOut} 0.9s ease;  */

const NavigationName = styled.span``;

const Navigation = () => {
    const roles = store?.getRoles() || [];
    const currentPath = window.location.pathname;
    const {translated} = useContext(LanguageContext)
    const navigationConfig = useMemo(() => {
            return NAVIGATION(translated);
        },
        [translated])
    const [showFullNavigation, setShowFullNavigation] = useState(() => {
        const storedValue = localStorage.getItem("showFullNavigation");
        return storedValue !== "false";
    });


    useEffect(() => {
        localStorage.setItem("showFullNavigation", showFullNavigation.toString());
    }, [showFullNavigation]);

    const handleToggleNavigation = () => {
        setShowFullNavigation((prevState) => !prevState);
    };

    const activeIndex = navigationConfig.findIndex(
        (element) =>
            roles?.find((role) => element.role.includes(role)) &&
            window?.location?.pathname?.includes(element.link)
    );

    return (
        <NavigationWrapper>
            <HideButton
                handleToggleNavigation={handleToggleNavigation}
                showFullNavigation={showFullNavigation}
            />
            {navigationConfig.map(
                (element, index) =>
                    roles?.find((role) => element.role.includes(role)) && (
                        <React.Fragment key={element.name}>
                            <NavigationElement
                                showFull={showFullNavigation}
                                className={index === activeIndex ? "active" : ""}
                            >
                                {showFullNavigation ? (
                                    <StyledLink to={element.link}>
                                        <Icon
                                            iconName={element.icon}
                                            showFull={showFullNavigation}
                                            style={{
                                                color: index === activeIndex ? COLORS.accent : COLORS.grey,
                                            }}
                                        />
                                        <NavigationName
                                            style={{
                                                color: index === activeIndex ? COLORS.accent : COLORS.grey,
                                            }}
                                        >
                                            {element.name}
                                        </NavigationName>
                                    </StyledLink>
                                ) : (
                                    <StyledLink to={element.link}>
                                        <NavigationIcon
                                            iconName={element.icon}
                                            showFull={showFullNavigation}
                                            style={{
                                                color: index === activeIndex ? COLORS.accent : COLORS.grey,
                                            }}
                                        />
                                    </StyledLink>
                                )}
                            </NavigationElement>
                        </React.Fragment>
                    )
            )}
        </NavigationWrapper>
    );
};

export default Navigation;
