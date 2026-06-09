rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /exam_results/{docId} {
      allow read, write: if true;
    }
  }
}