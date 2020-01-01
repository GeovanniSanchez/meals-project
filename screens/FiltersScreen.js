import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from '../constants/Colors';

import { useDispatch } from "react-redux";
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};


const FiltersScreen = props => {

    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree ] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isvegan, setIsVegan] = useState(false);
    const [isVegetarian, setisVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback( () => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isvegan,
        vegetarian: isVegetarian
      }; 

      dispatch(setFilters(appliedFilters));
      
    },
        [isGlutenFree, isLactoseFree, isvegan, isVegetarian, dispatch]
    );

    useEffect(() => {
        // setParams() causes the component to rebuild 
        // because its props (the navigation prop) change.
        navigation.setParams({save: saveFilters});
        console.log("useEffect");
        
    },
    [saveFilters]
    );



    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label='Lactose-free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                state={isvegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setisVegetarian(newValue)}
            />
        </View>

    );
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filtered Meals',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName='ios-save'
                    onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        )
    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }

});

export default FiltersScreen;