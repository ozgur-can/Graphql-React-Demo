import React from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Grid,
  Image,
  Card,
  Dimmer,
  Loader,
  Icon,
  CardHeader
} from "semantic-ui-react";
import { ALink, BoldText } from "../../styled-components/";
import { useHistory } from "react-router-dom";
import { CardSection } from "../../styled-components";

const statusIcon = status => {
  if (status === "Alive") return <Icon name="heart"></Icon>;
  else if (status === "Dead") return <Icon name="flag outline" />;
  else return <Icon name="user secret" />;
};

const CharacterCard = item => {
  const client = useApolloClient();
  let history = useHistory();

  return (
    <Card>
      <Image src={item.item.image} wrapped ui={true} as={"a"} href={`/character/${item.item.id}`} />
      <Card.Content>
        <CardHeader>
          <ALink
            onClick={() => {
              client.writeData({ data: { selectedCharID: item.item.id } });
              history.push(`/character/${item.item.id}`);
            }}
          >
            {item.item.name}
          </ALink>{" "}
          {statusIcon(item.item.status)}
        </CardHeader>
        <Card.Description>
          <CardSection>
            <BoldText>Species:</BoldText> {item.item.species}
          </CardSection>
          <CardSection>
            <BoldText>Gender:</BoldText> {item.item.gender}
          </CardSection>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      id
      name
      status
      species
      gender
      image
    }
  }
`;

const Characters = () => {
  const characters = useQuery(GET_CHARACTERS);

  return characters.data ? (
    characters.data.characters.map((data, i) => {
      return (
        <Grid.Column key={i}>
          <CharacterCard item={data} />
        </Grid.Column>
      );
    })
  ) : (
    <div>
      <Dimmer active>
        <Loader size="mini">Loading ..</Loader>
      </Dimmer>
    </div>
  );
};

const CharacterList = () => (
  <Grid columns={5} doubling>
    <Characters />
  </Grid>
);

export default CharacterList;
