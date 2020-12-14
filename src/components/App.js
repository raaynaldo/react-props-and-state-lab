import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (type) => {
    console.log(type);
    this.setState({
      filters: {
        type: type,
      },
    });
  };

  onFindPetsClick = () => {
    const type = this.state.filters.type;
    const url = type == "all" ? "/api/pets" : `/api/pets?type=${type}`;

    fetch(url)
      .then((res) => res.json())
      .then((pets) =>
        this.setState({
          pets: pets,
        })
      );
  };

  onAdoptPet = (id) => {
    let pets = [...this.state.pets];
    let petIndex = pets.findIndex((pet) => pet.id == id);
    pets[petIndex].isAdopted = true;

    // this.state.pets[petIndex].isAdopted = true
    this.setState({
      // pets: this.state.pets,
      pets: pets,
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
