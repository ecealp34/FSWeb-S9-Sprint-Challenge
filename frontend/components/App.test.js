// Write your tests here
import AppFunctional from "./AppFunctional"
import React from "react";
import { render } from '@testing-library/react';

test('sanity', () => {
  expect(true).toBe(true)
})

test('hata olmadan render ediliyor', () => {
  render(<AppFunctional/>);
  });


 
  
   