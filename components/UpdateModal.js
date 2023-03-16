import React, { useEffect } from "react";
import { styles } from "@/styles/style";
import supabase from "@/pages/utils/supabaseClient";
import updateTableElement from "@/pages/crud/updateElement";

const UpdateModal = ({
  links,
  setLinks,
  toUpdate,
  setToUpdate,
  isOpen,
  setIsOpen,
}) => {
  const updateLink = async () => {
    let interlude;
    try {
      const { data, error } = await supabase
        .from("links")
        .update({ title: toUpdate.title, url: toUpdate.url })
        .match({ id: toUpdate.id });
      if (error) {
        console.error(error);
        return null;
      }
      interlude = links.filter((ele) => ele.id !== toUpdate.id);
      interlude = [...interlude, toUpdate];
      setLinks(interlude);
      setIsOpen(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //fct pour mettre à jour les éléments
  const testUpdate = async () => {
    await updateTableElement(
      "links",
      { title: toUpdate.title, url: toUpdate.url }, //possible de stocker les deux objets dans des variables avant de les mettre en paramètres
      { id: toUpdate.id } //ça dépend de chacun, pour l'exemple je laisse comme ça
    );

    let interlude = links.filter((ele) => ele.id !== toUpdate.id);
    interlude = [...interlude, toUpdate];
    setLinks(interlude);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.modal} flex flex-col items-center`}>
      <div className="mt-4">
        <input
          type="text"
          id="title"
          className="border border-gray-300 rounded-md"
          placeholder="Un lien random"
          value={toUpdate.title}
          onChange={(e) => setToUpdate({ ...toUpdate, title: e.target.value })}
        />
      </div>
      <div className="mt-4">
        <input
          type="text"
          id="url"
          className="border border-gray-300 rounded-md"
          placeholder="google.com"
          value={toUpdate.url}
          onChange={(e) => setToUpdate({ ...toUpdate, url: e.target.value })}
        />
      </div>
      <div>
        <button
          className={`${styles.button}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          Fermer
        </button>
        <button className={`${styles.button}`} onClick={updateLink}>
          Modifier lien
        </button>
        <button className={`${styles.button}`} onClick={testUpdate}>
          Test module CRUD
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
