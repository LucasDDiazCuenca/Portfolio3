import SubSectionLayout from "../../components/molecules/SubSectionLayout";
import {
  SUBSECTION_CONTENT,
  SUBSECTION_CRYSTAL_TYPES,
  SUBSECTION_LAYOUTS,
} from "../../logic/constants/subsections";

export default function SubSectionProjects() {
  return (
    <SubSectionLayout
      content={SUBSECTION_CONTENT.projects}
      crystalType={SUBSECTION_CRYSTAL_TYPES.projects}
      reversed={SUBSECTION_LAYOUTS.projects.reversed}
    />
  );
}
