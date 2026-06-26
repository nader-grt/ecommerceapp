import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Resource } from "react-admin";

import authProvider from "./core/providers/authProvider";



import { RegisterPage } from "./auth/pages/RegisterPage";
import { LoginPage } from "./auth/pages/LoginPage";
import MyLayout from "./core/layout/MyLayout";
import themes from "./modules/themes";
import dataProvider from "./core/providers/dataProvider";

import { EditCategorie, ListCategories } from "./modules/categories";
import { CreateUser, EditUser, ListUsers } from "./modules/users";

import { CreateProduct, EditProduct, ListProducts } from "./modules/products";
import { CreateUserAddress, EditUserAddress, ListUserAddress, ShowUserAddress } from "./modules/userAddress";

import { CreateCategorie } from "./modules/categories/CreateCategorie";

import Dashboard from "./dashboard/Dashboard";



const App = () => {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <Admin
            dataProvider={dataProvider}
              authProvider={authProvider}
             dashboard={Dashboard}
             layout={MyLayout}
             {...themes}
            >
          

          <Resource
    name="users"
    list={ListUsers}
    create={CreateUser}
    edit={EditUser}
   // show={showUser}
  />

<Resource
    name="usersAddress"
    list={ListUserAddress}
   create={CreateUserAddress}
   show={ShowUserAddress}
   edit={EditUserAddress}
  
   // show={showUser}
  />
 <Resource
    name="categories" 
    //categories
    create={CreateCategorie}
    list={ListCategories}
    edit={EditCategorie}
    
  /> 


  <Resource  name="products"
    create={CreateProduct}
  list={ListProducts}
  edit={EditProduct}
  />


              <Resource name="dashboard"  />
            </Admin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;