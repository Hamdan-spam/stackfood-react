import React, { useState } from 'react'
const foodItems = [
    {
        id: 1,
        name: 'Tofu Stir Fry',
        vegetarian: true,
        glutenFree: false,
        organic: false,
    },
    {
        id: 2,
        name: 'Quinoa Salad',
        vegetarian: true,
        glutenFree: true,
        organic: true,
    },
    {
        id: 3,
        name: 'Grilled Salmon',
        vegetarian: false,
        glutenFree: true,
        organic: false,
    },
    {
        id: 4,
        name: 'Organic Fruit Bowl',
        vegetarian: false,
        glutenFree: false,
        organic: true,
    },
]
export const FoodList = () => {
    const [filters, setFilters] = useState({
        vegetarian: false,
        glutenFree: false,
        organic: false,
    })

    // Handle checkbox change events
    const handleCheckboxChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.checked,
        })
    }

    // Filter the list based on the current filter values
    const filteredFoodItems = foodItems.filter((item) => {
        return (
            (filters.vegetarian && item.vegetarian) ||
            (filters.glutenFree && item.glutenFree) ||
            (filters.organic && item.organic) ||
            (!filters.vegetarian && !filters.glutenFree && !filters.organic)
        )
    })

    // Render the filter checkboxes and the filtered food list
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    name="vegetarian"
                    checked={filters.vegetarian}
                    onChange={handleCheckboxChange}
                />{' '}
                Vegetarian
            </label>
            <label>
                <input
                    type="checkbox"
                    name="glutenFree"
                    checked={filters.glutenFree}
                    onChange={handleCheckboxChange}
                />{' '}
                Gluten-Free
            </label>
            <label>
                <input
                    type="checkbox"
                    name="organic"
                    checked={filters.organic}
                    onChange={handleCheckboxChange}
                />{' '}
                Organic
            </label>

            <ul>
                {filteredFoodItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}
