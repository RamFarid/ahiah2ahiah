This project is part of a series of conferences. These conferences are held over three days each year.
My first version of this project was in **January 2023**

In fact, this version is full of many features compared to the other two versions ([**Secondary Retreat**](https://ramfarid.vercel.app/portfolio/secondary-retreat) and [**Omana Akfa Retreat**](https://ramfarid.vercel.app/portfolio/omana-akfa-retreat)) and this is due to the conference organizers being the ones who request what should be added, modified or deleted.

## User roles
There are two user roles in the website:
- Organizer: They can control the website data
- Member: They can see them results and interact with the things that the organizers selected

I have made three versions over two years for this conference series. But I have added two versions only because the second version is as same as the first differs in `colors` only, You can see the first version in my portfolio it called: "[**Secondary Retreat**](https://ramfarid.vercel.app/portfolio/secondary-retreat)".

This project has were used by over **300 members**

The conference takes you on a journey to deliver a specific topic over three days, The conference organizers do their best to convey the desired idea to the conference members, they decided to make the conference more interactive.

They brought me to do the following:
- [**Quizzes**](https://ahiah2ahiah.vercel.app/quiz)
- Score Page 
- Professional Dashboard to control the score and quizzes results

### [**The Quizzes**](https://ahiah2ahiah.vercel.app/quiz)
In order to ensure that the information is conveyed, the conference organizers decided to conduct simple quizzes as a test.
Let's clarify the **`quizzes`** feature.
This feature designed to manage the score of each member on the conference as we go far on the conference it be hard to manually score up or down each member so this web application development by me to manage [**Quizzes**](https://ahiah2ahiah.vercel.app/quiz) of these members and automatically score up each member by its name after ending the quiz. this help the **organizers** control the score as you see in the dashboard


|          | Organizers | Members |
| ---- | ---------- | --------- |
| **Add/Remove quiz** | Can delete or add any quizzes | Can not add or remove yet |            |
| **Quiz Activity** | The Organizers after adding multiple quizzes they can control the specific quiz they want to display as the active quiz ready for interact | They only can see the quiz to start test themselves |
| **Quiz Result** | Can see all the score of the members because it saved in dashboard can see in anytime (Can see the total quiz result or Any separate quiz result or The total score). The **Organizers** has the full control | Can only see the `score` immediately after they submitted and **Can't DIRECTLY** go back to see the score again or see other members quiz result |


### **The Score**
As I mentioned before the organizers strive to make the conference more fun. They make a virtual score completely controlled on the website each member strive to get the highest score.  
**The conference organizers asked me in this release to limit the visibility of the _`SCORE page`_ to only the organizers and not to the conference members too**

> In this version, There is **Score** page contains the bonus that the member collected over the conference and in the **Dashboard** the whole result appears to the organizers (Score bonus mixed with the quizzes)

|          | Organizers | Members |
| ---- | ---------- | --------|
| **Add/Remove Member** | Can completely Add a member and Remove any member from the score table | Can not add or remove |
| **Score Up/Down** | Can completely control [**The Score**](https://ahiah2ahiah.vercel.app/score) of each Member | Only **SEE** and **can not** control their scores |
| **Edit a member** | Full control on editing any member data | **Can not** edit |

### [**The Professional Dashboard**](https://ahiah2ahiah.vercel.app/dashboard)

The Dashboard and Statistics is a page for **_organizers only_** that contains:  
- **Result of the quiz.**  
   Organizers can see the quiz result for each member, when the member took the quiz and what they chose in the answers to each question in detail.
- **Control quizzes**  
   As I mentioned there is a quiz from the uploaded quizzes would be active at the time to choose the quiz that appear to the members in case. The dashboard  also show up the questions and the answers of each quiz
- **Members details**
   - Bonus Score
   - Quiz result details
   The dashboard displays the score bonus mixed with result of the quizzes or displays result quizzes and bonus separately or each quiz result separately

### Backend managements 
Using react in this case will be so good choice For me especially SEO is not important to me. so I decided to use react with APIs.

As a backend management I used:
- MongoDB (As a DB)
- Node js & Express (For The Server)