import styled from 'styled-components'

const Wrapper = styled.nav`
  height: 100vh;
  grid-column: 1/1;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-500);
  padding-left: 1rem;

  a {
    text-decoration: none;
    color: var(--white);
    font-size: 1.8rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  a:hover {
    color: var(--grey-900);
  }

  .icon {
    margin-right: 0.4rem;
  }
  .active-book {
    color: var(--grey-900);
  }
  .active-student {
    color: var(--grey-900);
  }

  @media (max-width: 580px) {
    height: 100%;
  }
`

export default Wrapper
