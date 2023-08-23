import { create } from "zustand";

interface Team {
  team_id: string;
  team_name: string;
  format: string;
  location: string;
  team_admin: number;
  rating: string;
  // Add other properties as needed
}

interface TeamStoreState {
  teams: Team[];
  addTeam: (team: Team) => void;
}

interface ActiveTeamState {
  activeTeam: Team | null;
  setActiveTeam: (team: Team) => void;
}

const useTeamStore = create<TeamStoreState & ActiveTeamState>((set) => ({
  teams: [],
  activeTeam: null,
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  setActiveTeam: (team) => set(() => ({ activeTeam: team })),
}));

export default useTeamStore;
