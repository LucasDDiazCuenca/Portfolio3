import SubSectionLayout from "../../components/molecules/SubSectionLayout";
import {
  SUBSECTION_CONTENT,
  SUBSECTION_CRYSTAL_TYPES,
  SUBSECTION_LAYOUTS,
} from "../../logic/constants/subsections";

export default function SubSectionExperience() {
  return (
    <SubSectionLayout
      content={SUBSECTION_CONTENT.experience}
      crystalType={SUBSECTION_CRYSTAL_TYPES.experience}
      reversed={SUBSECTION_LAYOUTS.experience.reversed}
    />
  );
}
