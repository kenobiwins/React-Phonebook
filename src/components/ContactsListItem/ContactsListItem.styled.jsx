import styled from 'styled-components';

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.space[3]}px;

  button {
    margin-left: auto;
  }
`;

export const Avatar = styled.img`
  width: ${p => p.theme.space[5]}px;
  border-radius: ${p => p.theme.radii.round};
`;
