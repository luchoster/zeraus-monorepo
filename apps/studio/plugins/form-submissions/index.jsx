import * as R from "ramda";
import React from "react";
import sanityClient from "@sanity/client";

import "./styles.css";

const mapIndexed = R.addIndex(R.map);

const client = sanityClient({
  projectId: "b80qy5y0",
  dataset: "zeraus",
  token:
    "skRW2wWIms1O4DKNPlFfBIGsptQYLieRmz8r7HYcg4q71OtVV7OHeFeH2O2fo5k7tHFIjzxrCTQfnnmfg9ow27nnir199qMpXs4WqVasLyzYOAFLRhJdUmHIScDNVQM2VAYMd40fXEnCFXlVlXcSNCdrYZHUf6Pzf22K2YQmyGnIXT0jH9gK", // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});

const Submissions = () => {
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    getClient();
  }, []);

  function getClient() {
    const query = `*[_type == "contactForm"] {
      ...contactFormData
    }`;

    client.fetch(query).then((entry) => {
      setEntries(...entries, entry);
    });
  }

  return (
    <div className={"container"}>
      <header className={"header"}>
        <h2 className={"title"}>Form Submissions</h2>
      </header>
      <div className={"content"}>
        <ul className={"list"}>
          {mapIndexed((entry, index) => {
            return (
              <li key={index}>
                <section className="nes-container with-title is-dark">
                  <h3 className="title is-centered">{entry.name}</h3>
                  <p>
                    Email: <small>{entry.email}</small>
                  </p>
                  <p>Message: {entry.message}</p>
                </section>
              </li>
            );
          })(entries)}
        </ul>
      </div>
      <div className={"footer"} />
    </div>
  );
};

export default {
  name: "form-submissions",
  title: "Form Submissions",
  component: Submissions,
};
