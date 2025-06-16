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
      classManagement {
        schedule {
          day
          classMinute
        }
      }
      applicationFormId
      matchingId
      subject
      matchingStatus
      parent {
        kakaoName
        phoneNumber
      }
      teacher {
        nickName
        phoneNumber
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
  mutation updateMatching($matchingIds: [Int], $matchingStatus: String) {
    updateMatching(matchingIds: $matchingIds, matchingStatus: $matchingStatus)
  }
`;
