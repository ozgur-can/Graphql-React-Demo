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

const CharacterCard = ({ item }) => {
  const client = useApolloClient();
  let history = useHistory();

  return (
    <Card>
      <Image src={item.image} wrapped ui={true} />
      <Card.Content>
        <CardHeader>
          <div class="ui two column grid">
            <div class="row">
              <div class="column">
                {item.name}
              </div>
              <div class="column">
                <ALink
                  onClick={() => {
                    client.writeData({ data: { selectedCharID: item.id } });
                    history.push(`/character/${item.id}`);
                  }}
                >
                  <Icon name="hand point right" />
                  info
                </ALink>
              </div>
            </div>
          </div>
        </CardHeader>
        <Card.Description>
          <CardSection>
            <BoldText>Species:</BoldText> {item.species}
          </CardSection>
          <CardSection>
            <BoldText>Gender:</BoldText> {item.gender}
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
