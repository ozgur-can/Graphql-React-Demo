import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Item, Icon, Dimmer, Loader, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { BoldText, CardSection } from "../../styled-components";

const GET_CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      location {
        name
        url
      }
    }
  }
`;

const GET_CHARACTER_CLIENT = gql`
  query getSelectedCharID {
    selectedCharID @client
  }
`;

const Char = ({ item }) => {
  let history = useHistory();

  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={item.image} />
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {item.name}
            </Item.Header>
            <Item.Description>
              <CardSection>
                <BoldText>Species:</BoldText> {item.species}
              </CardSection>
              <CardSection>
                <BoldText>Status:</BoldText> {item.status}
              </CardSection>
              <CardSection>
                <BoldText>Gender:</BoldText> {item.gender}
              </CardSection>
              <CardSection>
                <BoldText>Location:</BoldText> {item.location.name}
              </CardSection>
            </Item.Description>
            <Button
              style={{ marginTop: "2em" }}
              as="a"
              onClick={() => history.push("/")}
              positive
            >
              <Icon name="left arrow" />
              go back
            </Button>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

const Character = () => {
  const charIdClient = useQuery(GET_CHARACTER_CLIENT);
  const character = useQuery(GET_CHARACTER, {
    variables: { id: charIdClient.data.selectedCharID }
  });

  return character.data ? (
    <Char item={character.data.character} />
  ) : (
    <div>
      <Dimmer active>
        <Loader size="mini">Loading character..</Loader>
      </Dimmer>
    </div>
  );
};

export default Character;
