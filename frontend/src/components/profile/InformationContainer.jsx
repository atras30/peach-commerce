import React, {useContext, useEffect} from "react";
import {useUserContext} from "../../provider/ContextProvider";

export default function InformationContainer({toggleIsEditing}) {
  const {authenticatedUser} = useUserContext();

  return (
    <div className="information-container rounded shadow bg-white w-100 p-3 position-relative">
      <img onClick={toggleIsEditing} className="edit-batch-button position-absolute" type="button" src={require("../../assets/img/edit_button_2.png")} alt="Edit Button" />

      <table>
        <tr>
          <td className="p-2">Username</td>
          <td className="p-2">:</td>
          <td className="p-2">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.username}</td>
        </tr>

        <tr>
          <td className="p-2">Email</td>
          <td className="p-2">:</td>
          <td className="p-2">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.email}</td>
        </tr>

        <tr>
          <td className="p-2">Nomor Telepon</td>
          <td className="p-2">:</td>
          <td className="p-2">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.phone_number}</td>
        </tr>

        <tr>
          <td className="p-2">Alamat Utama</td>
          <td className="p-2">:</td>
          <td className="p-2">{authenticatedUser == null ? "Fetching  Data..." : authenticatedUser.address}</td>
        </tr>
      </table>
    </div>
  );
}
