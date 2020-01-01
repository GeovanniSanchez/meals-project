import React, {useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from '../store/actions/meals';


const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealsDetailScreen = props => {

  const mealId = props.navigation.getParam('mealId');
  const availableMeals = useSelector(state => state.meals.meals);
  const isFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);


   useEffect(() => {
     props.navigation.setParams({toggleFav: toggleFavoriteHandler});    
   }, [toggleFavoriteHandler]);

   useEffect(() => {
     props.navigation.setParams({mealIsFav: isFavorite});
   }, [isFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
      <View>
        <View style={styles.details}>
          <DefaultText>{selectedMeal.duration} minutes</DefaultText>
          <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => 
          <ListItem key={ingredient}>{ingredient}</ListItem>
          )}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(step => 
          <ListItem key={step}>{step}</ListItem>
          )}
      </View>      
    </ScrollView>
  );
};

MealsDetailScreen.navigationOptions = navigationData => {
  //const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const mealIsFav = navigationData.navigation.getParam('mealIsFav');


  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item
          title="Favorite"
          iconName={mealIsFav ? "ios-star" : 'ios-star-outline'}
          onPress={toggleFavorite} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    padding: 10
  }
});

export default MealsDetailScreen;