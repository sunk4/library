import styled from "styled-components";

const Wrapper = styled.section`
  grid-column: 2/2;
  padding-left: 2rem;
  margin-top: 2rem;
  button {
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  .btn-delete {
    background-color: var(--red-light);
    color: var(--white);
  }
  .btn-delete:hover {
    background-color: var(--red-dark);
  }

  .btn-open-modal,
  .btn-open-student {
    background-color: var(--primary-500);
    color: var(--white);
  }
  .btn-open-modal:hover,
  .btn-open-student:hover {
    background-color: var(--primary-600);
  }

  .btn-open-student {
    display: inline-block;
    width: 100%;
  }
  .section-student {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .section-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export default Wrapper