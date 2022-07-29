import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CardsInflu } from "../component/cardsInfluencers";
import { Search } from "../component/search";
import { Calltoaction } from "../component/calltoaction";
import { Context } from "../store/appContext";
import { Headerdirectorio } from "../component/headerdirectorio";

export const Directorio = () => {
  const { store, actions } = useContext(Context);
  return (

    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Headerdirectorio />
      <div className="container">
        <Search />
        <div className="row my-5">
          {
			    store.influencers?.map((obj,i) => {
				    
				    return <div className="col-3">
              <CardsInflu nombre={obj.name} username={obj.ig_user} sector={obj.categoria} seguidores={obj.seguidores} i={i} imagen={obj.profilepic} ubicacion={obj.ciudad}/>
              </div>
			    })}
        </div>
      </div>
      <Calltoaction />
    </div>
  );
};
