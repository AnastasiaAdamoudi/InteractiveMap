const fetchData = async (dataType) => { // this is a function that takes in a dataType as an argument, from the fetch call in the App.js file, according to the dataType, it will fetch the data from the json file
    try {
      const response = await fetch(`/path-to-data/${dataType}.json`); // this is the fetch call, it is using the dataType argument to fetch the data from the json file
      const data = await response.json(); // this is the data that is being fetched from the json file
      return data; 
    } catch (error) {
      console.error(`Error fetching ${dataType} data:`, error);
      return null;
    }
  };
  
  const saveData = async (dataType, newData) => { // this is a function that takes in a dataType and newData as arguments, the newData is the data that will be saved to the json file
    try {
      const response = await fetch(`/path-to-data/${dataType}.json`, { 
        method: 'POST', // POST is the method that is used to save data to the json file
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData), // this is the data that is being saved to the json file, it has to be stringified first because it is an object and the json file only accepts strings
      });
      const savedData = await response.json(); // this is the data that is being saved to the json file
      return savedData;
    } catch (error) {
      console.error(`Error saving ${dataType} data:`, error);
      return null;
    }
  };

  const deleteData = async (dataType, newData) => {
    try {
      const response = await fetch(`/path-to-data/${dataType}.json`, { 
        method: 'DELETE', // DELETE is the method that is used to delete data from the json file
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      const deletedData = await response.json();
      return deletedData;
    } catch (error) {
      console.error(`Error deleting ${dataType} data:`, error);
      return null;
    }
  }

  const updateData = async (dataType, newData) => {
    try {
      const response = await fetch(`/path-to-data/${dataType}.json`, { 
        method: 'PUT', // PUT is the method that is used to update data in the json file
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error(`Error updating ${dataType} data:`, error);
      return null;
    }
  }


  export { fetchData, saveData, deleteData, updateData };
  