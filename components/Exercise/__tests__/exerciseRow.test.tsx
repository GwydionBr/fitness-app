import React from "react";
import { render } from "@testing-library/react-native";
import ExerciseRow from "../exerciseRow";
import { Tables } from "@/types/db.types";

describe("ExerciseRow", () => {
  it("renders correctly with exercise data", () => {
    const mockExercise: Tables<"exercise"> = {
      id: "1",
      title: "Test Exercise",
      information: "Test Description",
      created_at: new Date().toISOString(),
      user_id: "1",
    };

    const { getByText } = render(<ExerciseRow exercise={mockExercise} />);

    expect(getByText("Test Exercise")).toBeTruthy();
  });
});
