import styled from 'styled-components'

const Wrapper = styled.form`
  max-width: 30%;
  margin: 2rem auto 0;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 30px solid var(--primary-500);
  border-radius: 20px;
  padding: 1rem;
  h2,label {
    color: var(--primary-500);
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem;

    label {
      margin-bottom: 0.5rem;
    }
    input {
      margin: 0.5rem 0;
      border: none;
      border-radius: 10px;
      width: 100%;
      padding: 0.375rem 0.75rem;
      background: var(--backgroundColor);
      border: 1px solid var(--grey-200);
    }
  }
  p {
    text-align: center;
  }
  button {
    background-color: var(--primary-500);
    padding: 0.5rem;
    border-radius: 5px;
    color: var(--white);
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: var(--primary-600);
  }
`

export default Wrapper
