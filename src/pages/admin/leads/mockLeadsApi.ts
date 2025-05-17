
import { Lead } from "./AllLeads";

/**
 * Mock async function to simulate fetching leads from an API endpoint.
 * Returns promise resolving after a delay with static lead data.
 */
export function fetchLeads(): Promise<Lead[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          company: "ABC Corp",
          service: "web_development",
          message: "I need a new website for my business.",
          date: "2024-04-01",
          status: "new",
          priority: "medium"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          company: "XYZ Inc",
          service: "mobile_app",
          message: "Looking for a team to develop our mobile app.",
          date: "2024-03-28",
          status: "contacted",
          priority: "high",
          reminder: "2024-04-10"
        },
        {
          id: 3,
          name: "Robert Johnson",
          email: "robert@example.com",
          company: "Johnson & Co",
          service: "ui_ux",
          message: "We need help redesigning our user interface.",
          date: "2024-03-25",
          status: "in_progress",
          priority: "medium"
        },
        {
          id: 4,
          name: "Sarah Williams",
          email: "sarah@example.com",
          company: "Williams Tech",
          service: "digital_marketing",
          message: "Interested in your digital marketing services.",
          date: "2024-03-20",
          status: "converted",
          priority: "low",
          notes: "Client signed the contract on April 2nd."
        },
        {
          id: 5,
          name: "Michael Brown",
          email: "michael@example.com",
          company: "Brown Enterprises",
          service: "seo",
          message: "Looking to improve our search engine rankings.",
          date: "2024-03-15",
          status: "lost",
          priority: "low",
          notes: "Client went with another agency due to budget constraints."
        }
      ]);
    }, 1500); // 1.5 second simulated network delay
  });
}
