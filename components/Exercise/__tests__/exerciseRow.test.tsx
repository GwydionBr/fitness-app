import React from "react";
import { render } from "@testing-library/react-native";
import ExerciseRow from "../exerciseRow";
import { Tables } from "@/types/db.types";

describe("ExerciseRow", () => {
  it("renders correctly with exercise data", () => {
    const mockExercise: Tables<"exercise"> = {
      id: "1",
      title: "Test Exercise",
      description: "Test Description",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { getByText } = render(<ExerciseRow exercise={mockExercise} />);

    expect(getByText("Test Exercise")).toBeTruthy();
  });
});
