import { gql } from "@apollo/client";

export const GET_CLASSLIST = gql`
  query GetFinalMatchedApplicationForms(
    $matchingStatus: [String]
    $matchingIds: [Int]
  ) {
    applicationFormByMatchingId(
      matchingStatus: $matchingStatus
      matchingIds: $matchingIds
    ) {
      applicationFormId
      matchingId
      subject
      matchingStatus
      parent {
        kakaoName
      }
      teacher {
        nickName
      }
    }
  }
`;

export const GET_CLASS_DETAIL = gql`
  query GetClassDetail($matchingIds: [Int], $matchingStatus: [String]) {
    applicationFormByMatchingId(
      matchingIds: $matchingIds
      matchingStatus: $matchingStatus
    ) {
      classManagement {
        firstDay
        schedule {
          classScheduleId
          day
          start
          classMinute
        }
      }
      teacher {
        phoneNumber
      }
      parent {
        phoneNumber
      }
    }
  }
`;

export const PUT_CLASS_STATUS = gql`
  mutation pauseMatching($matchingIds: [Int]) {
    pauseMatching(matchingIds: $matchingIds)
  }
`;
