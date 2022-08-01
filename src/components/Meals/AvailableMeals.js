import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';

import { FIREBASE_URL } from '../../helpers/config';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useAJAX from '../../hooks/useAJAX';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useAJAX();

  useEffect(() => {
    const configObj = {
      url: `${FIREBASE_URL}/meals.json`,
    };
    const formatMeals = data => {
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals(configObj, formatMeals);
  }, [fetchMeals]);

  let mealsContent = <p>No meals found</p>;
  if (isLoading) mealsContent = <p>Loading...</p>;
  if (error) mealsContent = <p style={{ color: 'red' }}>{error}</p>;
  else
    mealsContent = (
      <ul>
        {meals.map(meal => (
          <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    );

  return (
    <section className={classes.meals}>
      <Card>{mealsContent}</Card>
    </section>
  );
};

export default AvailableMeals;
